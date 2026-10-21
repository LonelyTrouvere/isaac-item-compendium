import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__header">
        <div className="footer__slash"></div>
        <h3 className="footer__header__h">About Project</h3>
        <div className="footer__slash"></div>
      </div>
      <div className="footer__sections">
        <section className="footer__section">
          <h4 className="footer__section__header">Made for fans</h4>
          <p className="footer__section__text">
            This project is made for TBOI fans by Lonely Trouvere for tracking
            item progression in the game. Future extansion may be delivared for
            tracking achivements, secrets and bestiary <br />
            Creator is a Steam Sale player but is aspiing for full TBOI
            completion.
          </p>
        </section>
        <section className="footer__section">
          <h4 className="footer__section__header">Thank you</h4>
          <p className="footer__section__text">
            Thanks to Edmund and this community for the amazing game. <br />{" "}
            Special thanks to{" "}
            <a href="https://github.com/Zamiell/isaac-save-viewer">Zamiel</a>{" "}
            and <a href="https://github.com/bladecoding">Blade</a> for project
            inspiration and help with technical details.
          </p>
        </section>
      </div>
    </footer>
  );
}
