import { useState } from "react";
import {
  FaWhatsapp,
  FaFacebookF,
  FaXTwitter,
  FaLink,
  FaCheck,
} from "react-icons/fa6";

import styles from "./ShareButtons.module.css";

const ShareButtons = ({ title, url, vertical = false }) => {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = {
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className={`${styles.share} ${vertical ? styles.vertical : ""}`}>
      <a href={links.whatsapp} target="_blank" rel="noopener noreferrer">
        <FaWhatsapp />
      </a>

      <a href={links.facebook} target="_blank" rel="noopener noreferrer">
        <FaFacebookF />
      </a>

      <a href={links.twitter} target="_blank" rel="noopener noreferrer">
        <FaXTwitter />
      </a>

      <div className={styles.copyWrapper}>
        <button
          onClick={handleCopy}
          aria-label={copied ? "Link copied" : "Copy link"}
        >
          {copied ? <FaCheck /> : <FaLink />}
        </button>

        {copied && <span className={styles.copyMessage}>Link copied!</span>}
      </div>
    </div>
  );
};

export default ShareButtons;
