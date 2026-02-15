import yaml from 'js-yaml';
import fs from 'node:fs';
import path from 'node:path';

interface TagEntry {
  canonical: string;
  synonyms?: string[];
}

interface TagGroup {
  name: string;
  tags: TagEntry[];
}

interface TagRegistry {
  groups: TagGroup[];
}

let _registry: TagRegistry | null = null;

export function loadTagRegistry(): TagRegistry {
  if (_registry) return _registry;

  const filePath = path.resolve('src/data/tag-registry.yaml');
  const content = fs.readFileSync(filePath, 'utf-8');
  _registry = yaml.load(content) as TagRegistry;
  return _registry;
}

export function getCanonicalTag(input: string): string {
  const registry = loadTagRegistry();
  const normalized = input.trim().toLowerCase();

  for (const group of registry.groups) {
    for (const tag of group.tags) {
      if (tag.canonical.toLowerCase() === normalized) {
        return tag.canonical;
      }
      if (tag.synonyms?.some((s) => s.toLowerCase() === normalized)) {
        return tag.canonical;
      }
    }
  }

  return input;
}

export function getTagsByParent(parentName: string): string[] {
  const registry = loadTagRegistry();
  const group = registry.groups.find((g) => g.name === parentName);
  return group ? group.tags.map((t) => t.canonical) : [];
}

export function getAllTags(): { canonical: string; parent: string }[] {
  const registry = loadTagRegistry();
  const result: { canonical: string; parent: string }[] = [];

  for (const group of registry.groups) {
    for (const tag of group.tags) {
      result.push({ canonical: tag.canonical, parent: group.name });
    }
  }

  return result;
}
