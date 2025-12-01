import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TvMazeApiService } from '../services/tv-maze-api.service';
import DetailsPage from './details-page';

describe('DetailsPage', () => {
  let component: DetailsPage;
  let fixture: ComponentFixture<DetailsPage>;
  let componentRef: ComponentRef<DetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsPage],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting(), TvMazeApiService],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsPage);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    // Set required input
    componentRef.setInput('id', 1);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have id input', () => {
    expect(component.id()).toBe(1);
  });

  it('should update when ID input changes', () => {
    // Initially set ID to 1
    componentRef.setInput('id', 1);
    fixture.detectChanges();

    expect(component.id()).toBe(1);

    // Change ID to 2
    componentRef.setInput('id', 2);
    fixture.detectChanges();

    expect(component.id()).toBe(2);
  });

  it('should have showDetails resource', () => {
    expect(component.showDetails).toBeDefined();
    expect(typeof component.showDetails).toBe('object');
  });

  it('should have back button with correct default href', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const backButton = compiled.querySelector('ion-back-button');

    expect(backButton?.getAttribute('defaultHref')).toBe('/');
  });

  it('should display correct template structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('ion-header')).toBeTruthy();
    expect(compiled.querySelector('ion-toolbar')).toBeTruthy();
    expect(compiled.querySelector('ion-content')).toBeTruthy();
    expect(compiled.querySelector('ion-buttons')).toBeTruthy();
  });

  it('should display collapsible header correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const collapseHeader = compiled.querySelector('ion-header[collapse="condense"]');

    expect(collapseHeader).toBeTruthy();
  });
});
