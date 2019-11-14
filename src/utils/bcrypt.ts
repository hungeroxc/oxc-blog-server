import bcrypt from 'bcrypt'

const SALT_WORK_FACTOR = 10

export const encrypt = (password: string) => {
    return new Promise<string>((resolve, reject) => {
        bcrypt.genSalt(SALT_WORK_FACTOR, (err: Error, salt: string) => {
            if (err) {
                reject(password)
            }
            bcrypt.hash(password, salt, (err: Error, hash: string) => {
                if (err) {
                    reject(password)
                }
                resolve(hash)
            })
        })
    })
}

export const comparePassword = (password: string, hash: string) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err: Error, isMatch: boolean) => {
            if (err) {
                reject(err)
            } else {
                resolve(isMatch)
            }
        })
    })
}
