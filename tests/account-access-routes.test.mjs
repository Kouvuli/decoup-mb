import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { test } from 'node:test';
import { getRoutes } from 'expo-router/build/getRoutes.js';

test('the app shell exposes account entry and recovery routes', () => {
  const appDirectory = join(process.cwd(), 'src', 'app');
  const keys = routeFiles(appDirectory).map(file => `./${relative(appDirectory, file).split(sep).join('/')}`);
  const context = Object.assign(() => ({ default: () => null }), {
    keys: () => keys,
    resolve: key => key,
    id: 'account-access-routes',
  });
  const routes = getRoutes(context, { ignoreEntryPoints: true, skipGenerated: true });

  assert.ok(routes);
  assert.ok(findRoute(routes, 'sign-in'), 'expected the /sign-in route');
  assert.ok(findRoute(routes, 'account'), 'expected the Account tab route');
});

function routeFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? routeFiles(path) : /\.[jt]sx?$/.test(entry.name) ? [path] : [];
  });
}

function findRoute(route, name) {
  return route.route === name || route.children?.some(child => findRoute(child, name));
}
