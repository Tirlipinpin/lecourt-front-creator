import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { FETCH_MOVIE_DETAILS } from '../../../../reducers/movieDetails/constants';

export interface IMovieDetailsMatchParams {
  id: string
}

export interface IMovieDetails extends RouteComponentProps<IMovieDetailsMatchParams> {
  dispatch: Dispatch
}

export class MovieDetails extends Component<IMovieDetails> {
  componentDidMount(): void {
    const { dispatch, match } = this.props;
    const { id } = match.params;

    dispatch({
      type: FETCH_MOVIE_DETAILS,
      id,
    });
  }

  render() {
    return (
      <div>
        MovieDetails
      </div>
    );
  }
}

export default connect(({ movieDetails }: any) => ({
  movieDetails,
}))(MovieDetails);