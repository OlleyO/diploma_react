import emailjs from "@emailjs/browser";

interface EmailData {
  text: string;
  email: string;
  id: string;
  name: string;
  textTitle: string;
}

export const sendEmail = (data: EmailData) => {
  emailjs
    .send(
      "service_8yp8tuk",
      "template_99ly41r",
      {
        message: data.text,
        reply_to: data.email,
        id: data.id,
        name: data.name,
        textTitle: data.textTitle,
      },
      {
        publicKey: "cxmqn5_CrK4I-gEdn",
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
