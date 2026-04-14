import React from "react";
import MinistryHero from "../../components/ministry/MinistryHero";
import MinistrySplitSection from "../../components/ministry/article/MinistrySplitSection";
import FullWidthHighlight from "../../components/ministry/article/FullWidthHighlight";
import StartHomeChurch from "../../components/homechurch/StartHomeChurch";

import homechurch from "../../assets/images/home-church.jpg";
import journey from "../../assets/images/Journey_to_Bethel_2.jpg";
import creating from "../../assets/images/Creating_GH.jpg";

const HomeChurch = () => {
  return (
    <>
      <MinistryHero
        label="Home Church"
        title="Make your home the house of God"
        description="The Home Church is about making our homes the house of God, where we experience His presence and glory. To achieve this, we must put away all idols from our homes, including dysfunctionalities, distractions, divisions, quarrels, immoralities, and indiscipline. Just like Jacob, you can encounter God in your home. When you resolve to make your home the House of God, you create a space to experience His presence and glory."
        image={homechurch}
        alt={
          "A cosy home interior filled with soft golden light, symbolizing peace, purity, and the presence of God."
        }
      />
      <MinistrySplitSection
        title={"Concept of the Home Church."}
        image={journey}
        imageAlt={
          "A quiet pathway leading to a glowing house on a hill, bathed in golden light, symbolizing a journey toward God’s presence."
        }
        imagePosition="left"
      >
        <article className="gl2c-2">
          <p>
            The concept of the Home Church originated from Genesis 35:1-7, where
            God instructed Jacob to go up to Bethel and dwell there. Jacob
            obeyed by directing his family to put away all their foreign gods,
            purify themselves, and wash their garments before embarking on the
            journey. Bethel was where God revealed Himself to Jacob and promised
            to give him and his descendants the land.
          </p>

          <p>
            In Genesis 35:1-7, God told Jacob, "...Arise, go up to Bethel and
            dwell there ..." (Verse1). Jacob's response to this instruction from
            God was to instruct his entire household to:
          </p>

          <ul className="list">
            <li>Put away all the foreign gods in their possession</li>
            <li>Purify themselves, and</li>
            <li>Wash their garments.</li>
          </ul>

          <p>
            So, before they embarked on the journey to Bethel, they gave all
            their foreign gods to him. What is it about Bethel that Jacob had to
            issue these instructions to his family?
          </p>

          <h3 className="gradientText">The Significance of Bethel</h3>
          <p>
            In Genesis 28:10-17, God revealed Himself and the Abrahamic covenant
            to Jacob in a dream. Jacob was on his way to Padan-Aram and spent
            the night in Luz. That night, he had a dream in which he saw "...a
            ladder set up on the earth, and its top reached to heaven, and there
            angels ascending and descending on it." (Verse 12). At the top of
            the ladder, Jacob saw the Lord Almighty. God introduced Himself as
            the God of Abraham and Isaac, his fathers, and promised to give
            Jacob and his descendants the land he laid down. Also, God promised
            to take him to Padan-Aram and bring him back safely to this land. He
            would bring him to his father and not leave him until He had
            fulfilled all He promised Jacob. When Jacob woke up from the dream,
            he said, "...How dreadful is this place! This is none other but the
            house of God, and this is the gate of heaven." (Verse17).
          </p>

          <p>
            Genesis 28:18, 19 tells us that Jacob got up early in the morning,
            took the stone he used as a pillow, set it up as a pillar, anointed
            it with oil, and called the place Bethel.
          </p>
          <p>
            So in Genesis 35, when God said to Jacob, "...Arise, go up to Bethel
            and dwell there ..." God was telling him to go to the house of God
            and dwell there. He knew that he was going to a place where God was
            to stay with his household. That was why he instructed all his
            family members to put away all their idols, purify themselves, and
            clean their garments. The Home Church is about our homes where we
            dwell, becoming the house of God. A place where we encounter God and
            His glory while enjoying angelic activities.
          </p>
        </article>
      </MinistrySplitSection>
      <FullWidthHighlight>
        <blockquote>
          The Home Church is about our homes where we dwell, becoming the house
          of God. A place where we encounter God and His glory while enjoying
          angelic activities.
        </blockquote>
      </FullWidthHighlight>
      <MinistrySplitSection
        title={"Creating a House of God"}
        image={creating}
        imageAlt={
          "A peaceful home interior filled with gentle golden light, symbolizing God’s presence, purity, unity, and spiritual renewal."
        }
        imagePosition="left"
      >
        <article className="gl2c-1">
          <p>
            Like Jacob, who became aware that God was in the place where he was
            sleeping, we should all know that God is in our homes, and we do not
            need to search for Him. When God instructed Jacob, "Arise and go up
            to Bethel", Jacob had to travel from Shechem to Bethel to obey that
            instruction. Whereas Jacob undertook a physical journey, for us, it
            is mental, spiritual, attitudinal, and consecratory to meet God in
            our homes. When we truly decide to make our homes the house of God,
            one of the things we will have to do is to put all idols out of our
            homes. Besides the obvious ones like amulets, charms, and shrines,
            we should extinguish others like dysfunctionalities, distractions,
            divisions, quarrels, immoralities, and indiscipline in our homes.
          </p>

          <p>
            When we resolve to make our homes the House of God, we create a
            space to experience God's presence and glory.
          </p>

          <h3 className="gradientText">Benefits</h3>
          <ul className="list">
            <li>
              It creates a deeper connection between you and your family with
              God.
            </li>
            <li>It builds stronger family bonds and relationships.</li>
            <li>It forges an enabling environment for angelic activities.</li>
          </ul>
        </article>
      </MinistrySplitSection>
      <StartHomeChurch />
    </>
  );
};

export default HomeChurch;
