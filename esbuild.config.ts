import * as esbuild from 'esbuild';
import dotenv from 'dotenv';

// Change the environment (production|docker) depends on your need.
dotenv.config({path: '.env.docker'});
esbuild.build({
    entryPoints: ['./src/app.ts'],
    bundle: true,
    platform: 'node',
    outfile: './build/main.bundle.js',
    loader: {'.ts': 'ts'},
    define: {
        'process.env.MONGODB_URL': `'${process.env['MONGODB_URL']}'`
    }
}).then(() => console.log('⚡ Bundle Build Completed ⚡'))
