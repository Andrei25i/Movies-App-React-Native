import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import BackButton from "../../../components/BackButton";
import Cast from "../../../components/Cast";
import Genres from "../../../components/Genres";
import Hero from "../../../components/Hero";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Category from "../../../components/movies/Category";
import Collection from "../../../components/movies/Collection";
import Overview from "../../../components/Overview";
import Section from "../../../components/Section";
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
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
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
        const genreIds =
          detailsData.genres?.map((genre) => genre.id).join(",") || "";
        if (genreIds) {
          const recRes = await fetch(
            `https://api.themoviedb.org/3/discover/movie?certification.lte=R&certification_country=US&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreIds}`,
            options
          );
          const recData = await recRes.json();
          setRecommendations(recData.results || []);
        }

        // Age rating
        const releaseRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/release_dates`,
          options
        );
        const releaseData = await releaseRes.json();
        const usRelease = releaseData.results?.find(
          (release) => release.iso_3166_1 === "US"
        );
        if (usRelease) {
          const certification = usRelease.release_dates.find(
            (date) => date.certification
          );
          setAgeRating(certification ? certification.certification : "TBD");
        } else {
          setAgeRating("TBD");
        }

        // Trailer
        const videosRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
          options
        );
        const videosData = await videosRes.json();
        const foundTrailer = videosData.results?.find(
          (video) => video.type === "Trailer" && video.official
        );
        setTrailer(foundTrailer || {});

        // Cast
        const creditsRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
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
        <WatchlistButton details={details} type="movies" />
      </TopButtons>
      
      <ScrollView
        style={styles.contentWrapper}
        contentContainerStyle={{ paddingBottom: 100, gap: 50 }}
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

        {details.belongs_to_collection ? <Collection title={details.belongs_to_collection.name} id={details.belongs_to_collection.id} /> : ""}

        <Section>
          <Category title="More Like This" category={recommendations} />
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
