"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import ContactLinks from "./ContactLinks";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  message: yup.string().required("Name is required"),
});

const Footer = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: unknown) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    }
    setIsSubmitting(false);
  };

  return (
    <footer
      id="contact"
      className="mt-8 bg-gray-800 bg-opacity-90 text-gray-300 dark:bg-gray-900 dark:bg-opacity-90"
    >
      <div className="container mx-auto px-10 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-white">Contact Me</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-md">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500"
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500"
                  placeholder="Your email"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  {...register("message")}
                  rows={4}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500"
                  placeholder="Your message"
                ></textarea>
                {errors.message && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.message.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full rounded bg-purple-600 px-4 py-2 font-bold text-white hover:bg-purple-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
              {submitStatus === "success" && (
                <p className="mt-4 text-green-600 dark:text-green-400">
                  Message sent successfully!
                </p>
              )}
              {submitStatus === "error" && (
                <p className="mt-4 text-red-600 dark:text-red-400">
                  Failed to send message. Please try again.
                </p>
              )}
            </form>
          </div>
          <div>
            <h2 className="mb-4 text-2xl font-bold text-white">Connect With Me</h2>
            <div className="flex space-x-4">
              <ContactLinks />
            </div>
            <p className="mt-4 text-sm">
              © {new Date().getFullYear()} Christopher Fiallos. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
