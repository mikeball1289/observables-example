import { Observable, of } from 'rxjs';
import { startWith, map, catchError } from 'rxjs/operators';

export enum LoadingStatus {
    Pending = 'Pending',
    Loaded = 'Loaded',
    Error = 'Error',
}

export interface LoadedValue<T> {
    value: T;
    status: LoadingStatus.Loaded;
}

export interface LoadingErrorValue {
    status: LoadingStatus.Error;
    error: any;
}

export interface LoadingPendingValue {
    status: LoadingStatus.Pending;
}

export function LoadStatus(status: LoadingStatus.Error, error: any): LoadingErrorValue;
export function LoadStatus(status: LoadingStatus.Pending): LoadingPendingValue;
export function LoadStatus<T>(status: LoadingStatus.Loaded, value: T): LoadedValue<T>;
export function LoadStatus<T>(status: LoadingStatus, value?: any): LoadingValue<T> {
    return {
        status,
        [status === LoadingStatus.Error ? 'message' : 'value']: value
    } as LoadingValue<T>;
}

export function isLoaded<T>(loadingValue: LoadingValue<T>): loadingValue is LoadedValue<T> {
    return loadingValue.status === LoadingStatus.Loaded;
}

export function isPending<T>(loadingValue: LoadingValue<T>): loadingValue is LoadingPendingValue {
    return loadingValue.status === LoadingStatus.Pending;
}

export function isError<T>(loadingValue: LoadingValue<T>): loadingValue is LoadingErrorValue {
    return loadingValue.status === LoadingStatus.Error;
}

export function loadedValue<T>(loadingValue: LoadedValue<T>) {
    return loadingValue.value;
}

export function beginLoading<T>(obs: Observable<T>) {
    return obs.pipe(
        map(v => LoadStatus(LoadingStatus.Loaded, v)),
        startWith(LoadStatus(LoadingStatus.Pending)),
        catchError(err => of(LoadStatus(LoadingStatus.Error, err)))
    );
}

export type LoadingValue<T> = LoadedValue<T> | LoadingPendingValue | LoadingErrorValue;
