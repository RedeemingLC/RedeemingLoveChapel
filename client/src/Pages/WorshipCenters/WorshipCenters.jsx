import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";

import { MdLocationOn } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";

import styles from "./WorshipCenters.module.css";

const centers = [
  {
    name: "Satellite Town Center",
    address:
      "Redeeming Love Chapel, Site F, Graceland Estate, Chima Busstop, off Alakija/Navy Town road, Lagos, Nigeria",
    phone: "+234 8079 345 1234",
    pastor: "Pastor Omo",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.547086737867!2d3.27134097448013!3d6.452140123989555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8892239e5209%3A0xefc1e7de9e0d8433!2sRedeeming%20Love%20Chapel!5e0!3m2!1sen!2sng!4v1774602256901!5m2!1sen!2sng",
  },
  {
    name: "Ijanikin Center",
    address:
      "Redeeming Love Chapel, Ultimate Hall, Iyana-Isashi Bus Stop, Lagos.",
    phone: `+234 802 335 6805, +234 805 615 9911`,
    pastor: "Pastor Duke Okosun",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.196041924712!2d3.1683719744803196!3d6.496846923473545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b83833d54c9fb%3A0x8aa2d2dc2befb55c!2sUltimate%20hall!5e0!3m2!1sen!2sng!4v1774606358903!5m2!1sen!2sng",
  },
  {
    name: "Obadore Center",
    address:
      "Redeeming Love Chapel, Obadore Bus Stop, Obadore, Lasu/Isheri Express Way, Lagos State",
    phone: "+234 8079 345 1234",
    pastor: "Pastor Success Obienu",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.9524873272676!2d3.2116496744805474!3d6.527685323115777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b84ff224b50ad%3A0xafbcb1a835e71db3!2sObadore%20Bus%20Stop!5e0!3m2!1sen!2sng!4v1774607086111!5m2!1sen!2sng",
  },
  {
    name: "Lekki Center",
    address:
      "Redeeming Love Chapel, TMY Empire House 5, Scintilla Road, Opposite Paradise One Estate, Lekki Garden.",
    phone: "+234 806 801 1607",
    pastor: "Pastor Tayo Bamgbose",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63431.202412420425!2d3.4881830206858724!3d6.464516030403138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf716594409ed%3A0x19f928531be2932f!2sTmy%20Podcast!5e0!3m2!1sen!2sng!4v1774606991684!5m2!1sen!2sng",
  },
  {
    name: "Abuja Center",
    address:
      "Redeeming Love Chapel, GUU Guest House, Plot 376, EFAB Estate Road, Behind Polaris Bank, Life Camp, Abuja.",
    phone: `+234 813 815 7752, +234 803 403 3131`,
    pastor: "Pastor Martins Idudhe",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.0177194837765!2d7.403598675807339!3d9.062147665291189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e74e5aaff2e8b%3A0xedc4ba6b4324b578!2s376%20Efab%20Estate%20Rd%2C%20Abuja%20900108%2C%20Federal%20Capital%20Territory!5e0!3m2!1sen!2sng!4v1774606478178!5m2!1sen!2sng",
  },
  {
    name: "Asaba Center",
    address:
      "Redeeming Love Chapel, 3 Umuakpa Quarters Okwe, Asaba, Delta State.",
    phone: "+234 806 352 0933",
    pastor: "Pastor Daniel Nduka",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31733.464408442476!2d6.694426814254858!3d6.173172751998131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1043ed4452848db7%3A0x75f8286f854ddeec!2sUmu%20apa%20Quarter!5e0!3m2!1sen!2sng!4v1774606739106!5m2!1sen!2sng",
  },
];

export default function WorshipCenters() {
  return (
    <Section>
      <Container>
        {/* HERO */}
        <div className={styles.hero}>
          <h1>Our Worship Centers</h1>
        </div>

        {/* CENTERS */}
        <div className={styles.centers}>
          {centers.map((center, index) => (
            <div key={index} className={styles.centerCard}>
              {/* LEFT */}
              <div className={styles.info}>
                <h2 className="gradientText">{center.name}</h2>

                <div className={styles.wc_info}>
                  <div className={styles.iconWrapper}>
                    <MdLocationOn />
                  </div>
                  <p>{center.address}</p>
                </div>

                <div className={styles.wc_info}>
                  <div className={styles.iconWrapper}>
                    <MdLocalPhone />
                  </div>
                  <p>{center.phone}</p>
                </div>

                <div className={styles.wc_info}>
                  <div className={styles.iconWrapper}>
                    <FaUserTie />
                  </div>
                  <p>{center.pastor}</p>
                </div>

              </div>

              {/* RIGHT */}
              <div className={styles.map}>
                {center.mapEmbed && (
                  <iframe
                    src={center.mapEmbed}
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={center.name}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
