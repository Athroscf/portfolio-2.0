import { NextApiRequest, NextApiResponse } from "next";
import { resend } from "@/lib/resend";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;
    try {
      const data = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "fialloschris1@gmail.com", // Replace with your email
        subject: "New Contact Form Submission",
        html: `
          <h1>${name} contacted you through portfolio contact form.</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      });

      res.status(200).json({ message: "Email sent successfully", data });
    } catch (error) {
      res.status(500).json({ message: "Failed to send email", error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
