const crypto = require('crypto');

// Fungsi untuk membuat kunci privat dan kunci publik
function generateKeyPair() {
    const privateKey = crypto.randomBytes(32).toString('hex');
    const publicKey = crypto.createHash('sha256').update(privateKey).digest('hex');
    return { privateKey, publicKey };
}

// Fungsi untuk membuat alamat Bitcoin dari kunci publik
function generateBitcoinAddress(publicKey) {
    // Hash kunci publik dengan algoritma SHA-256 dan kemudian RIPEMD-160
    const sha256Hash = crypto.createHash('sha256').update(publicKey, 'hex').digest();
    const ripemd160Hash = crypto.createHash('ripemd160').update(sha256Hash).digest();

    // Tambahkan versi jaringan ke depan alamat (0x00 untuk jaringan Bitcoin utama)
    const networkVersion = '00';
    const extendedRipemd160Hash = networkVersion + ripemd160Hash.toString('hex');

    // Hitung checksum dengan dua kali hashing SHA-256
    const checksum = crypto.createHash('sha256').update(Buffer.from(extendedRipemd160Hash, 'hex')).digest();
    const doubleChecksum = crypto.createHash('sha256').update(checksum).digest();

    // Gabungkan alamat dengan checksum
    const bitcoinAddress = extendedRipemd160Hash + doubleChecksum.toString('hex').substring(0, 8);

    return bitcoinAddress;
}

// Membuat pasangan kunci privat dan kunci publik
const keyPair = generateKeyPair();
console.log('Kunci Privat:', keyPair.privateKey);
console.log('Kunci Publik:', keyPair.publicKey);

// Membuat alamat Bitcoin dari kunci publik
const bitcoinAddress = generateBitcoinAddress(keyPair.publicKey);
console.log('Alamat Bitcoin:', bitcoinAddress);
