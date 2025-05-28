// import { Resend } from 'resend';
// import dotenv from 'dotenv'
// dotenv.config()

// if(!process.env.RESEND_API){
//     console.log("Provide RESEND_API in side the .env file")
// }

// const resend = new Resend(process.env.RESEND_API);

// const sendEmail = async({sendTo, subject, html })=>{
//     try {
//         const { data, error } = await resend.emails.send({
//             from: 'PLN <pln-uptbogor.com>',
//             to: sendTo,
//             subject: subject,
//             html: html,
//         });

//         if (error) {
//             return console.error({ error });
//         }

//         return data
//     } catch (error) {
//         console.log(error)
//     }
// }

// export default sendEmail

import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.RESEND_API) {
  console.error("❌ Missing RESEND_API in .env file");
  process.exit(1); // hentikan aplikasi agar tidak jalan tanpa API key
}

const resend = new Resend(process.env.RESEND_API);

/**
 * Kirim email menggunakan layanan Resend
 * @param {Object} param0 
 * @param {string} param0.sendTo - Email tujuan
 * @param {string} param0.subject - Subjek email
 * @param {string} param0.html - Konten email (HTML)
 * @returns {Object} - { success: true/false, message: string }
 */
const sendEmail = async ({ sendTo, subject, html }) => {
  try {
    // Validasi sederhana
    if (!sendTo || !subject || !html) {
      return { success: false, message: "sendTo, subject, dan html wajib diisi." };
    }

    const { data, error } = await resend.emails.send({
      from: 'PLN <onboarding@resend.dev>', // ganti jika sudah pakai domain sendiri
      to: sendTo,
      subject: subject,
      html: html,
    });

    if (error) {
      console.error("❌ Gagal mengirim email:", error);
      return {
        success: false,
        message: "Gagal mengirim email. Periksa log server atau dashboard Resend.",
      };
    }

    return {
      success: true,
      message: "Email berhasil dikirim.",
      id: data?.id || null,
    };
  } catch (err) {
    console.error("❌ Terjadi error saat mengirim email:", err);
    return {
      success: false,
      message: "Terjadi kesalahan internal saat mengirim email.",
    };
  }
};

export default sendEmail;
