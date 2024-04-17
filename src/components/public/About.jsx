/* eslint-disable react/no-unescaped-entities */

import { Typography, Container, Grid, Button } from "@mui/material";
import Header from "../common/Header";

function About() {
  
  return (
    <>
      <Header />
      <Container sx={{ py: 4 }}>
        <Typography variant="h3" gutterBottom>
          About Filmify
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to Filmify, where we celebrate the magic of cinema and the joy
          of storytelling.
        </Typography>
        <Typography variant="h3" gutterBottom>
          Our Mission
        </Typography>
        <Typography variant="body1" paragraph>
          At Filmify, our mission is to bring people closer to the world of
          movies. Whether you're a seasoned cinephile or just starting to
          explore the wonders of film, we're here to enrich your cinematic
          journey.
        </Typography>
        <Typography variant="h3" gutterBottom>
          What we offer
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" paragraph>
              <strong>Explore:</strong> Dive into a vast collection of movies
              spanning various genres, languages, and eras. Discover hidden
              gems, timeless classics, and the latest blockbusters.
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Personalized Recommendations:</strong> Let Filmify be your
              guide! Receive tailored movie recommendations based on your
              preferences and viewing history.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" paragraph>
              <strong>Community Engagement:</strong> Join a vibrant community of
              film enthusiasts from around the globe. Share your thoughts,
              reviews, and recommendations with like-minded movie lovers.
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Stay Updated:</strong> Stay in the loop with the latest
              news, trailers, and updates from the world of cinema. Never miss a
              beat with our curated content and exclusive features.
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="h3" gutterBottom>
          Get in Touch
        </Typography>
        <Typography variant="body1" paragraph>
          Have questions, feedback, or suggestions? We'd love to hear from you!
          Reach out to us at{" "}
          <a href="mailto:contact@filmify.com">contact@filmify.com</a> and let's
          connect.
        </Typography>
        <Typography variant="h3" gutterBottom>
          Join the Filmify Family
        </Typography>
        <Typography variant="body1" paragraph>
          Ready to embark on an unforgettable cinematic journey? Download the
          Filmify app now and start exploring the wonderful world of movies!
        </Typography>
        <Button variant="contained" color="primary">
          Download Filmify App
        </Button>
      </Container>
    </>
  );
}

export default About;
