import { bikeBenefits, bikeStations } from '../data/siteContent.js'

function BikeShare() {
  return (
    <section className="page page-bikes">
      <section className="split-panel">
        <div className="section-heading">
          <p className="section-tag">Bike sharing</p>
          <h2>Support short-distance travel when the ride ends before the destination.</h2>
          <p>
            Bike access is included as part of the EcoRide experience so commuters can handle the
            last mile without needing another fuel-based trip.
          </p>
        </div>

        <div className="mission-card">
          <p className="section-tag">Why bike support matters</p>
          <h3>Cleaner mobility for the final stretch</h3>
          <ul className="clean-list">
            {bikeBenefits.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="content-grid">
        {bikeStations.map((station) => (
          <article key={station.name} className="info-card">
            <p className="section-tag">Dock station</p>
            <h3>{station.name}</h3>
            <p>{station.bikes}</p>
            <p>{station.distance}</p>
            <p>{station.availability}</p>
            <button className="primary-btn" type="button">
              Book a bike
            </button>
          </article>
        ))}
      </section>
    </section>
  )
}

export default BikeShare
