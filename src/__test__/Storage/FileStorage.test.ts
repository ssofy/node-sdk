import fs from "fs";
import {FileStorage} from "../../Storage/FileStorage";

describe('FileStorage Test', () => {
    const storagePath = fs.mkdtempSync('/tmp/');
    const cache = new FileStorage(storagePath);

    test('put and get simple key', async () => {
        await cache.put('test', 'something');

        return expect(await cache.get('test')).toBe('something');
    });

    test('test get and delete with key containing path', async () => {
        let promises = [];

        await cache.put('path/test', 'something');
        promises.push(expect(await cache.get('test')).toBe('something'));

        await cache.delete('path/test');
        promises.push(expect(await cache.get('path/test')).toBeNull());

        return Promise.all(promises);
    });

    test('expiration', async () => {
        await cache.put('test-ex', 'something', 2);

        await new Promise(resolve => setTimeout(resolve, 1000));
        expect(await cache.get('test-ex')).toBe('something');

        await new Promise(resolve => setTimeout(resolve, 1000));
        expect(await cache.get('test-ex')).toBeNull();
    });

    test('deletion', async () => {
        await cache.put('test-deletable', 'something');
        expect(await cache.get('test-deletable')).toBe('something');

        await cache.delete('test-deletable');
        expect(await cache.get('test-deletable')).toBeNull();
    });

    test('flush all', async () => {
        await cache.put('test-flushable', 'something');
        expect(await cache.get('test-flushable')).toBe('something');

        await cache.flushAll();
        expect(await cache.get('test-flushable')).toBeNull();
    });
});