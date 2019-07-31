import { CommonModule } from '@angular/common';
import { NumberSourceOpService } from './../async-ops/number-source-op.service';
import { MockProxy } from './../../mock-proxy';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TerribleComponent } from './terrible.component';
import { ClickCounter } from '../click-counter/click-counter';
import { of } from 'rxjs';

describe('TerribleComponent', () => {

    const clickCounterMock = MockProxy<ClickCounter>({ counter$: of(1) });
    const numberSourceServiceMock = MockProxy<NumberSourceOpService>();

    numberSourceServiceMock.getSomeNumbers.mockReturnValue(of([1, 2, 3]));

    let component: TerribleComponent;
    let fixture: ComponentFixture<TerribleComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule
            ],
            declarations: [
                TerribleComponent
            ],
            providers: [
                { provide: ClickCounter, useFactory: () => clickCounterMock },
                { provide: NumberSourceOpService, useFactory: () => numberSourceServiceMock },
            ]
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(TerribleComponent);
                component = fixture.componentInstance;
            });
    });

    test('is created', () => {
        expect(component).toEqual(expect.anything());
    });

    test('is clicked updates values', () => {
        component.onUpdateClicked();
        expect(component.numberValue).toEqual(1);
        expect(component.sumNumbers).toEqual([2, 3, 4]);
    });
});
