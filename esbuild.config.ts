import * as esbuild from 'esbuild';
import dotenv from 'dotenv';

dotenv.config({path: '.env.production'});
esbuild.build({
    entryPoints: ['./src/app.ts'],
    bundle: true,
    platform: 'node',
    outfile: './dist/main.bundle.js',
    loader: {'.ts': 'ts'},
    define: {
        'process.env.MONGODB_URL': `'${process.env['MONGODB_URL']}'`
    }
}).then(() => console.log('⚡ Bundle Build Completed ⚡'))
