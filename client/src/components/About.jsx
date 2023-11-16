import React from 'react'
import styles from './css/MainCss.module.css'
import picture1 from "../components/images/aboutBody.jpg"
import picture2 from "../components/images/about1.jpg"

const About = () => {
  return (
    <div className={styles.backgroundAbout}>
      <div className={styles.info1}>
        <img className={styles.pictureSize} src={picture1}></img>
        <h2 className={styles.head}>About us: </h2>
        <p className={styles.par}>Sed ut perspiciatis unde omnis iste natus error sit voluptatem 
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa 
          quae ab illo inventore veritatis et quasi architecto beatae vitae 
          dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit 
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores 
          eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, 
          qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, 
          sed quia non numquam eius modi tempora incidunt ut labore et dolore
          magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis 
          nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut 
          aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit 
          qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum 
          qui dolorem eum fugiat quo voluptas nulla</p>
      </div>
      <div className={styles.info1}>
        
        <h2 className={styles.head}>More... </h2>
        <p className={styles.par}>Sed ut perspiciatis unde omnis iste natus error sit voluptatem 
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa 
          quae ab illo inventore veritatis et quasi architecto beatae vitae 
          dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit 
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores 
          eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, 
          qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, 
          sed quia non numquam eius modi tempora incidunt ut labore et dolore
          magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis 
          nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut 
          aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit 
          qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum 
          qui dolorem eum fugiat quo voluptas nulla</p>
      <img className={styles.pictureSize} src={picture2}></img>
      </div>
  
    </div>
  )
}

export default About