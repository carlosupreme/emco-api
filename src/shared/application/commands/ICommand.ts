import { IRequest } from "mediatr-ts";

export interface ICommand<TResponse> extends IRequest<TResponse> {}
