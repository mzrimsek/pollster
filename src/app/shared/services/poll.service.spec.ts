import { TestBed } from '@angular/core/testing';

import { AngularFirestore } from 'angularfire2/firestore';
import { of } from 'rxjs';

import { FirestorePollItem, PollService } from './poll.service';

import { Poll } from '../models';

describe('PollService', () => {
  let service: PollService;
  let afs: AngularFirestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PollService,
        { provide: AngularFirestore, useValue: angularFirestoreStub }
      ]
    });

    service = TestBed.get(PollService);
    afs = TestBed.get(AngularFirestore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should call AngularFirestore collection with "poll"', () => {
    expect(afs.collection).toHaveBeenCalledWith('poll');
  });

  describe('savePoll', () => {
    const poll: Poll = {
      title: 'Lunch',
      options: {
        'Chipotle': 0,
        'Sheetz': 0,
        'Pulp': 0
      },
      selectionMode: 'SINGLE',
      createdAt: 10000,
      createdBy: 'Anonymous',
      validUntil: null
    };

    it('Should call collection add', () => {
      service.savePoll(poll);
      expect(collectionStub.add).toHaveBeenCalledWith(poll);
    });
  });

  describe('getPoll', () => {
    it('Should call collection doc with pollId', () => {
      service.getPoll('someId');
      expect(collectionStub.doc).toHaveBeenCalledWith('someId');
    });
  });
});

const testPollItem: FirestorePollItem = {
  title: 'Test Poll',
  options: {
    'Option 1': 0,
    'Option 2': 0
  },
  selectionMode: 'SINGLE',
  createdAt: 0,
  createdBy: 'Anonymous',
  validUntil: null
};

const documentStub = {
  valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of(testPollItem))
};

const collectionStub = {
  doc: jasmine.createSpy('doc').and.returnValue(documentStub),
  add: jasmine.createSpy('add').and.returnValue(new Promise((resolve) => {
    resolve({
      id: 'someDocId'
    });
  }))
};

const angularFirestoreStub = {
  collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
};
