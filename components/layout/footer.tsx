import React from "react";
import Section from "./section";
import { socials } from "@/constants";
import Link from "next/link";
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from "react-icons/fi";

type Props = {};

// Map of social media titles to their corresponding icons
const socialIcons: Record<string, JSX.Element> = {
  GitHub: <FiGithub className="size-5" />,
  LinkedIn: <FiLinkedin className="size-5" />,
  Twitter: <FiTwitter className="size-5" />,
  Email: <FiMail className="size-5" />
};

const Footer = (props: Props) => {
  return (
    <Section crosses className="!px-0 !py-10">
      <div className="container flex items-center justify-center gap-10 max-sm:flex-col sm:justify-between">
        <p className="caption text-n-4 lg:block">
          &copy; {new Date().getFullYear()} Ryan Elico. All rights reserved.
        </p>
        <ul className="flex flex-wrap gap-5">
          {socials.map((item) => (
            <Link
              key={item.id}
              href={item.url}
              target="_blank"
              className="flex size-10 items-center justify-center rounded-full bg-n-7 transition-colors hover:bg-n-6"
              title={item.title}
            >
              {socialIcons[item.title] || <FiMail className="size-5" />}
            </Link>
          ))}
        </ul>
      </div>
    </Section>
  );
};

export default Footer;
