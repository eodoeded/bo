-- Branded Objects Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Studios table (users who build tools)
CREATE TABLE IF NOT EXISTS studios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tools table (design tools built by studios)
CREATE TABLE IF NOT EXISTS tools (
  id TEXT PRIMARY KEY, -- e.g., 'x9z-22a'
  studio_id UUID REFERENCES studios(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft', -- 'draft', 'published', 'archived'
  canvas_width INTEGER DEFAULT 400,
  canvas_height INTEGER DEFAULT 500,
  layers JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of layer objects
  client_ui JSONB DEFAULT '{"logo": null, "topNavBg": "#1A1614", "topNavText": "#FFFFFF", "accentColor": "#E3E3FD"}'::jsonb, -- Client UI customization
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ,
  outputs_count INTEGER DEFAULT 0 -- Track how many assets generated
);

-- Tool versions table (for version control)
CREATE TABLE IF NOT EXISTS tool_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tool_id TEXT REFERENCES tools(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  layers JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES studios(id)
);

-- Generated assets table (track exports)
CREATE TABLE IF NOT EXISTS generated_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tool_id TEXT REFERENCES tools(id) ON DELETE CASCADE,
  client_inputs JSONB, -- Store what client entered
  asset_url TEXT, -- URL to stored asset (S3/R2)
  format TEXT, -- 'png', 'jpg', 'svg'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_tools_studio_id ON tools(studio_id);
CREATE INDEX IF NOT EXISTS idx_tools_status ON tools(status);
CREATE INDEX IF NOT EXISTS idx_tool_versions_tool_id ON tool_versions(tool_id);
CREATE INDEX IF NOT EXISTS idx_generated_assets_tool_id ON generated_assets(tool_id);

-- Row Level Security (RLS) Policies
ALTER TABLE studios ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_assets ENABLE ROW LEVEL SECURITY;

-- Studios can only see their own data
CREATE POLICY "Studios can view own data"
  ON studios FOR SELECT
  USING (auth.uid()::text = id::text);

CREATE POLICY "Studios can update own data"
  ON studios FOR UPDATE
  USING (auth.uid()::text = id::text);

-- Tools: Studios can manage their own tools
CREATE POLICY "Studios can view own tools"
  ON tools FOR SELECT
  USING (studio_id::text = auth.uid()::text);

CREATE POLICY "Studios can create own tools"
  ON tools FOR INSERT
  WITH CHECK (studio_id::text = auth.uid()::text);

CREATE POLICY "Studios can update own tools"
  ON tools FOR UPDATE
  USING (studio_id::text = auth.uid()::text);

CREATE POLICY "Studios can delete own tools"
  ON tools FOR DELETE
  USING (studio_id::text = auth.uid()::text);

-- Published tools are publicly readable (for Tool Runner)
CREATE POLICY "Published tools are public"
  ON tools FOR SELECT
  USING (status = 'published');

-- Tool versions: Studios can manage their own
CREATE POLICY "Studios can manage own tool versions"
  ON tool_versions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM tools 
      WHERE tools.id = tool_versions.tool_id 
      AND tools.studio_id::text = auth.uid()::text
    )
  );

-- Generated assets: Studios can view, anyone can create (for tracking)
CREATE POLICY "Studios can view own tool assets"
  ON generated_assets FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM tools 
      WHERE tools.id = generated_assets.tool_id 
      AND tools.studio_id::text = auth.uid()::text
    )
  );

CREATE POLICY "Anyone can create assets"
  ON generated_assets FOR INSERT
  WITH CHECK (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_studios_updated_at BEFORE UPDATE ON studios
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tools_updated_at BEFORE UPDATE ON tools
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to increment outputs_count
CREATE OR REPLACE FUNCTION increment_tool_outputs()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE tools 
  SET outputs_count = outputs_count + 1 
  WHERE id = NEW.tool_id;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to increment outputs when asset is generated
CREATE TRIGGER increment_tool_outputs_trigger
  AFTER INSERT ON generated_assets
  FOR EACH ROW EXECUTE FUNCTION increment_tool_outputs();

