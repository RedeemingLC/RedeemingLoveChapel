import styles from "./WorshipCenters.module.css";

const WorshipCenters = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Worship Centers</h1>

      <div className={styles.centerCard}>
        <h2>Main Worship Center</h2>

        <p>
          <strong>Address:</strong>
          <br />
          123 Redemption Avenue,
          <br />
          Abeokuta, Ogun State, Nigeria
        </p>

        <p>
          <strong>Service Times:</strong>
          <br />
          Sunday Worship: 9:00 AM
          <br />
          Midweek Service: Wednesday 6:00 PM
          <br />
          Prayer Meeting: Friday 6:00 PM
        </p>

        <p>
          <strong>Contact:</strong>
          <br />
          Phone: +234 XXX XXX XXXX
          <br />
          Email: info@redeeminglovechapel.org
        </p>

        <div className={styles.mapContainer}>
          <iframe
            title="Church Location"
            src="https://www.google.com/maps?q=Abeokuta,Ogun+State,Nigeria&output=embed"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default WorshipCenters;
