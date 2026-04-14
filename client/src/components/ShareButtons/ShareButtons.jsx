import { FaWhatsapp, FaFacebookF, FaXTwitter, FaLink } from "react-icons/fa6";

import styles from "./ShareButtons.module.css";

const ShareButtons = ({ title, url, vertical = false }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = {
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    alert("Link copied!");
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

      <button onClick={handleCopy}>
        <FaLink />
      </button>
    </div>
  );
};

export default ShareButtons;
