import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import BackButton from "../../../components/BackButton";
import Cast from "../../../components/Cast";
import Genres from "../../../components/Genres";
import Hero from "../../../components/Hero";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Overview from "../../../components/Overview";
import Section from "../../../components/Section";
import Category from "../../../components/shows/Category";
import Status from "../../../components/Status";
import TopButtons from "../../../components/TopButtons";
import Trailer from "../../../components/Trailer";
import WatchlistButton from "../../../components/WatchlistButton";
import { options } from "../../../options";

export default function MovieDetails() {
  const { id } = useLocalSearchParams();

  const [success, setSuccess] = useState(true);
  const [details, setDetails] = useState({});
  const [ageRating, setAgeRating] = useState([]);
  const [loading, setLoading] = useState(false);
  const [trailer, setTrailer] = useState({});
  const [cast, setCast] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        // Details
        const detailsRes = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
          options
        );
        const detailsData = await detailsRes.json();
        if (detailsData.success === false) {
          setSuccess(false);
          setLoading(false);
          return;
        }
        setDetails(detailsData);

        // Recommendations
        const recRes = await fetch(
          `https://api.themoviedb.org/3/tv/1396/recommendations?language=en-US&page=1`,
          options
        );
        const recData = await recRes.json();
        setRecommendations(recData.results || []);

        // Age rating
        const releaseRes = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/content_ratings`,
          options
        );
        const releaseData = await releaseRes.json();
        const usRating = releaseData.results?.find(
          (rating) => rating.iso_3166_1 === "US"
        );
        if (usRating) setAgeRating(usRating.rating);
        else setAgeRating("TBD");

        // Trailer
        const videosRes = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`,
          options
        );
        const videosData = await videosRes.json();
        const foundTrailer = videosData.results?.find(
          (video) => video.type === "Trailer" && video.official
        );
        setTrailer(foundTrailer || {});

        // Cast
        const creditsRes = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/credits?language=en-US`,
          options
        );
        const creditsData = await creditsRes.json();
        setCast(creditsData.cast ? creditsData.cast.slice(0, 20) : []);
      } catch (err) {
        setSuccess(false);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [id]);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <TopButtons>
        <BackButton />
        <WatchlistButton details={details} type="shows" />
      </TopButtons>

      <ScrollView
        style={styles.contentWrapper}
        contentContainerStyle={{ paddingBottom: 150, gap: 50 }}
      >
        <Hero details={details} ageRating={ageRating} type="shows" />

        <Genres details={details} />

        <Section title="Overview">
          <Overview details={details} />
        </Section>

        <Section title="Cast">
          <Cast cast={cast} />
        </Section>

        {trailer && trailer.key ? (
          <Section title="Trailer">
            <Trailer trailer={trailer} />
          </Section>
        ) : null}

        <Status details={details} />

        <Section>
          <Category title="Recommendations" category={recommendations} />
        </Section>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    backgroundColor: "#111",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    paddingVertical: 100,
    paddingHorizontal: 10,
  },
});
