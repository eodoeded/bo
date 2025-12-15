import { supabase, isSupabaseConfigured } from '../lib/supabase';

/**
 * Tool Service - Handles all tool CRUD operations
 * Falls back to localStorage if Supabase not configured
 */

// Generate unique tool ID (format: xxx-xxa)
const generateToolId = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const part1 = Array.from({ length: 3 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  const part2 = Array.from({ length: 2 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  const part3 = Array.from({ length: 1 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `${part1}-${part2}${part3}`;
};

// ===== LOCALSTORAGE FALLBACK =====
const localStorageGet = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    console.error('localStorage get error:', e);
    return null;
  }
};

const localStorageSet = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error('localStorage set error:', e);
    return false;
  }
};

// ===== SUPABASE OPERATIONS =====

/**
 * Get current user's studio ID
 */
export const getCurrentStudioId = async () => {
  if (!isSupabaseConfigured()) return null;
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  
  // Check if studio record exists, create if not
  const { data: existingStudio } = await supabase
    .from('studios')
    .select('id')
    .eq('id', user.id)
    .single();
  
  if (!existingStudio) {
    const { data: newStudio } = await supabase
      .from('studios')
      .insert({
        id: user.id,
        email: user.email,
        name: user.email?.split('@')[0] || 'Studio'
      })
      .select('id')
      .single();
    
    return newStudio?.id || null;
  }
  
  return existingStudio.id;
};

/**
 * Get all tools for current studio
 */
export const getTools = async () => {
  if (!isSupabaseConfigured()) {
    // Fallback: Return mock data structure
    return [];
  }
  
  const studioId = await getCurrentStudioId();
  if (!studioId) return [];
  
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .eq('studio_id', studioId)
    .order('updated_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching tools:', error);
    return [];
  }
  
  return data || [];
};

/**
 * Get a single tool by ID
 */
export const getTool = async (toolId) => {
  if (!isSupabaseConfigured()) {
    // Fallback: Check localStorage
    const saved = localStorageGet(`bo_tool_${toolId}`);
    if (saved) {
      return {
        id: toolId,
        name: `Tool_${toolId}`,
        status: 'draft',
        layers: saved,
        canvas_width: 400,
        canvas_height: 500,
        outputs_count: 0
      };
    }
    return null;
  }
  
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .eq('id', toolId)
    .single();
  
  if (error) {
    console.error('Error fetching tool:', error);
    return null;
  }
  
  return data;
};

/**
 * Create a new tool
 */
export const createTool = async (name = 'New Tool') => {
  if (!isSupabaseConfigured()) {
    // Fallback: Generate ID and save to localStorage
    const toolId = generateToolId();
    const defaultLayers = [
      {
        id: 'bg-1',
        type: 'rectangle',
        name: 'Background',
        zIndex: 0,
        properties: { x: 50, y: 50, width: 400, height: 500, color: '#1A1614' },
        locks: { x: 'LOCKED', y: 'LOCKED', width: 'LOCKED', height: 'LOCKED', color: 'LOCKED' }
      }
    ];
    localStorageSet(`bo_tool_${toolId}`, defaultLayers);
    return { id: toolId, name, status: 'draft', layers: defaultLayers };
  }
  
  const studioId = await getCurrentStudioId();
  if (!studioId) {
    throw new Error('No studio ID found. Please sign in.');
  }
  
  const toolId = generateToolId();
  const defaultLayers = [
    {
      id: 'bg-1',
      type: 'rectangle',
      name: 'Background',
      zIndex: 0,
      properties: { x: 50, y: 50, width: 400, height: 500, color: '#1A1614' },
      locks: { x: 'LOCKED', y: 'LOCKED', width: 'LOCKED', height: 'LOCKED', color: 'LOCKED' }
    }
  ];
  
  const { data, error } = await supabase
    .from('tools')
    .insert({
      id: toolId,
      studio_id: studioId,
      name,
      status: 'draft',
      layers: defaultLayers,
      canvas_width: 400,
      canvas_height: 500
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error creating tool:', error);
    throw error;
  }
  
  return data;
};

/**
 * Update a tool (save layers, name, etc.)
 */
export const updateTool = async (toolId, updates) => {
  if (!isSupabaseConfigured()) {
    // Fallback: Save to localStorage
    if (updates.layers) {
      localStorageSet(`bo_tool_${toolId}`, updates.layers);
    }
    return { id: toolId, ...updates };
  }
  
  const { data, error } = await supabase
    .from('tools')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', toolId)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating tool:', error);
    throw error;
  }
  
  return data;
};

/**
 * Publish a tool (change status from draft to published)
 */
export const publishTool = async (toolId) => {
  if (!isSupabaseConfigured()) {
    // Fallback: Just mark in localStorage
    const tool = localStorageGet(`bo_tool_${toolId}`);
    if (tool) {
      localStorageSet(`bo_tool_${toolId}_published`, true);
    }
    return { id: toolId, status: 'published' };
  }
  
  const { data, error } = await supabase
    .from('tools')
    .update({
      status: 'published',
      published_at: new Date().toISOString()
    })
    .eq('id', toolId)
    .select()
    .single();
  
  if (error) {
    console.error('Error publishing tool:', error);
    throw error;
  }
  
  return data;
};

/**
 * Get a published tool (for Tool Runner - no auth required)
 */
export const getPublishedTool = async (toolId) => {
  if (!isSupabaseConfigured()) {
    // Fallback: Check localStorage
    const saved = localStorageGet(`bo_tool_${toolId}`);
    if (saved) {
      return {
        id: toolId,
        name: `Tool_${toolId}`,
        status: 'published',
        layers: saved,
        canvas_width: 400,
        canvas_height: 500
      };
    }
    return null;
  }
  
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .eq('id', toolId)
    .eq('status', 'published')
    .single();
  
  if (error) {
    console.error('Error fetching published tool:', error);
    return null;
  }
  
  return data;
};

/**
 * Track asset generation (increment outputs_count)
 */
export const trackAssetGeneration = async (toolId, clientInputs = {}, format = 'png') => {
  if (!isSupabaseConfigured()) {
    // Fallback: Just log
    console.log('Asset generated:', { toolId, format });
    return;
  }
  
  const { error } = await supabase
    .from('generated_assets')
    .insert({
      tool_id: toolId,
      client_inputs: clientInputs,
      format,
      asset_url: null // TODO: Upload to S3/R2 and store URL
    });
  
  if (error) {
    console.error('Error tracking asset generation:', error);
  }
  
  // outputs_count is auto-incremented by trigger
};

/**
 * Delete a tool (soft delete - set status to archived)
 */
export const archiveTool = async (toolId) => {
  if (!isSupabaseConfigured()) {
    // Fallback: Remove from localStorage
    localStorage.removeItem(`bo_tool_${toolId}`);
    return { id: toolId, status: 'archived' };
  }
  
  const { data, error } = await supabase
    .from('tools')
    .update({ status: 'archived' })
    .eq('id', toolId)
    .select()
    .single();
  
  if (error) {
    console.error('Error archiving tool:', error);
    throw error;
  }
  
  return data;
};

/**
 * Delete a tool permanently (hard delete)
 */
export const deleteTool = async (toolId) => {
  if (!isSupabaseConfigured()) {
    // Fallback: Remove from localStorage
    localStorage.removeItem(`bo_tool_${toolId}`);
    return;
  }
  
  const { error } = await supabase
    .from('tools')
    .delete()
    .eq('id', toolId);
  
  if (error) {
    console.error('Error deleting tool:', error);
    throw error;
  }
};

