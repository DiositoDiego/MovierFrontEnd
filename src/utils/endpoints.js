const WatchedMovieFunction = "https://tvxbpcrvn8.execute-api.us-east-1.amazonaws.com/Prod/watched"

const UpdateMovieFunction = "https://ef1df7bdn9.execute-api.us-east-1.amazonaws.com/Prod/update/" //id

const GetCommentsFunction = "https://k9q0jtx81f.execute-api.us-east-1.amazonaws.com/Prod/getComment/" //id

const CreateMovieFunction = "https://ef1df7bdn9.execute-api.us-east-1.amazonaws.com/Prod/create"

const DeleteCommentFunction = "https://k9q0jtx81f.execute-api.us-east-1.amazonaws.com/Prod/delete"

const GetWatchedMovieFunction = "https://tvxbpcrvn8.execute-api.us-east-1.amazonaws.com/Prod/watched/user/" //id

const CreateUserFunction = "https://rqhdzpv6rh.execute-api.us-east-1.amazonaws.com/Prod/create_user"

const ChangeStatusMovieFunction = "https://ef1df7bdn9.execute-api.us-east-1.amazonaws.com/Prod/status/" //id

const GetMovieFunction = "https://ef1df7bdn9.execute-api.us-east-1.amazonaws.com/Prod/getAll" //Esta trae status 1 

const GetMovieByIdFunction = "https://ef1df7bdn9.execute-api.us-east-1.amazonaws.com/Prod/getMovie/" //id

const SetPasswordFunction = "https://rqhdzpv6rh.execute-api.us-east-1.amazonaws.com/Prod/set_password"

const LoginFunction = "https://rqhdzpv6rh.execute-api.us-east-1.amazonaws.com/Prod/login"

const CreateCommentFunction = "https://k9q0jtx81f.execute-api.us-east-1.amazonaws.com/Prod/create"

const GetAllMoviesFunction = "https://ef1df7bdn9.execute-api.us-east-1.amazonaws.com/Prod/getAllMovies" //Esta trae status 0 y 1 

export default {
  WatchedMovieFunction,
  UpdateMovieFunction,
  GetCommentsFunction,
  CreateMovieFunction,
  DeleteCommentFunction,
  GetWatchedMovieFunction,
  CreateUserFunction,
  ChangeStatusMovieFunction,
  GetMovieFunction,
  GetMovieByIdFunction,
  SetPasswordFunction,
  LoginFunction,
  CreateCommentFunction,
  GetAllMoviesFunction
}