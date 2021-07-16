import { sha256 } from './sha256';

export const getCloudinarySignature = (formData: FormData, secret: string) => {
    const _res_string =
        Array.from(formData.entries())
            .reduce((res: any, cur, i) => {
                if (i > 1) {
                    const [key, value] = cur;
                    res = [...res, `${[key]}=${value}`];
                }
                return res;
            }, [])
            .join('&') + secret;
    let hashDigest = sha256(_res_string);
    return hashDigest;
};