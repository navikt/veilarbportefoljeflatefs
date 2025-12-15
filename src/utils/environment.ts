class Environment {
    get isDemo() {
        return import.meta.env.MODE === 'demo';
    }
}

const env = new Environment();

export default env;
