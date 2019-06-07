import React, { Component } from 'react';
import { match } from 'react-router';
import { connect } from 'react-redux';

export interface IMovieDetails {
  match: match
}

export class MovieDetails extends Component<IMovieDetails> {
  render() {
    return (
      <div>
        MovieDetais
      </div>
    );
  }
}

export default connect(({ movieDetails }: any) => ({
  movieDetails,
}))(MovieDetails);