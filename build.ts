import fs from 'fs-extra';
import logger from 'jet-logger';
import childProcess from 'child_process';

// Start
(async () => {
    try {
        // Remove current build
        await remove('./dist/');
        // await remove('./views/');
        // // Copy front-end files
        // await copy('./client/build', './dist/views');
        // await copy('./client/build/static', './dist/static');
        // await copy('./client/build', './views');
        // await copyfile('./.env', './dist/.env');
        // Copy back-end files
        await exec('tsc --build tsconfig.prod.json', './');
    } catch (err) {
        logger.err(err);
    }
})();

/**
 * Remove file
 */
function remove(loc: string): Promise<void> {
    return new Promise((res, rej) => {
        return fs.remove(loc, (err) => {
            return (!!err ? rej(err) : res());
        });
    });
}

/**
 * Copy file.
 */
function copy(src: string, dest: string): Promise<void> {
    return new Promise((res, rej) => {
        return fs.copy(src, dest, (err) => {
            return (!!err ? rej(err) : res());
        });
    });
}

function copyfile(src: string, dest: string): Promise<void> {
    return new Promise((res, rej) => {
        fs.copyFile(src, dest, (err) => {
            if (err) throw err;
            return (!!err ? rej(err) : res());
        });
    })
}


function exec(cmd: string, loc: string): Promise<void> {
    return new Promise((res, rej) => {
        return childProcess.exec(cmd, { cwd: loc }, (err, stdout, stderr) => {
            if (!!stdout) {
                logger.info(stdout);
            }
            if (!!stderr) {
                logger.warn(stderr);
            }
            return (!!err ? rej(err) : res());
        });
    });
}