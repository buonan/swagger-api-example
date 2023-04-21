const crypt = require("crypto")
const algorithm = 'aes-256-ctr';
const iv = crypt.randomBytes(16);

class BCrypt {
    encrypt = (text: string | undefined, key = process.env.SECRET_KEY) => {
        let encrypt = '';
        if (text) {
            const cipher = crypt.createCipheriv(algorithm, key, iv);
            const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
            encrypt = iv.toString('hex') + '$' + encrypted.toString('hex');
        }
        return encrypt;
    }

    decrypt = (hash: string, key = process.env.SECRET_KEY) => {
        const pair = hash.split('$')
        const iv = pair[0]
        const contents = pair[1]
        const decipher = crypt.createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'));
        const decrpyted = Buffer.concat([decipher.update(Buffer.from(contents, 'hex')), decipher.final()]);
        return decrpyted.toString();
    }

    compare = (rawPassword: string | undefined, hashedPassword: string | undefined) => {
        try {
            if (rawPassword && hashedPassword) {
                const decryptPassword = this.decrypt(hashedPassword);
                return rawPassword === decryptPassword;
            }
        } catch (error: any) {
            throw Error(error.message);
        }
    }

}

export default new BCrypt();