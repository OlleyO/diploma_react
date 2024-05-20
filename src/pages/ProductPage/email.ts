import emailjs from "@emailjs/browser";

interface EmailData {
  text: string;
  email: string;
}

export const sendEmail = (data: EmailData) => {
  emailjs
    .send(
      "service_l5isptw",
      "template_ct586qo",
      { message: data.text, reply_to: data.email },
      {
        publicKey: "NJbA6dbvKrZIj6iBa",
      }
    )
    .then(
      () => {
        console.log("SUCCESS!");
      },
      (error) => {
        console.log("FAILED...", error.text);
      }
    );
};
