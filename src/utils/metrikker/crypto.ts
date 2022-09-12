declare global {
    interface MsCryptoOperation {
        result: ArrayBuffer;
        oncomplete: (event: MsCryptoOperation) => void;
        onerror: (event: MsCryptoOperation) => void;
    }

    interface Window {
        msCrypto: {
            subtle: {
                digest(algoritm: string, data: Uint8Array): MsCryptoOperation;
            };
        };
    }
}

interface CompatCrypto {
    subtle: {
        digest(algoritm: string, data: Uint8Array): Promise<ArrayBuffer>;
    };
}

export function getCrypto(): CompatCrypto {
    const crypto = window.crypto || window.msCrypto;
    return {
        subtle: {
            digest(algorithm: string, data: Uint8Array): Promise<ArrayBuffer> {
                const digest: MsCryptoOperation | PromiseLike<ArrayBuffer> = crypto.subtle.digest('SHA-256', data);

                if (digest instanceof Promise) {
                    return digest;
                }

                const msDigest = digest as unknown as MsCryptoOperation;
                return new Promise((resolve, reject) => {
                    msDigest.oncomplete = () => resolve(msDigest.result);
                    msDigest.onerror = () => reject(Error('Kunde ikke hashe veileder id'));
                });
            }
        }
    };
}
