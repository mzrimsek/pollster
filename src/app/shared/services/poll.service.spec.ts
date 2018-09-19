import { TestBed } from '@angular/core/testing';

import { AngularFirestore } from 'angularfire2/firestore';
import { of } from 'rxjs';

import { PollService } from './poll.service';

import { poll } from '../../test-helpers';

describe('PollService', () => {
  let service: PollService;
  let afs: AngularFirestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PollService,
        { provide: AngularFirestore, useValue: poll.firestore.angularFirestoreStub }
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
    it('Should call collection add', () => {
      service.savePoll(poll.testPoll);
      expect(poll.firestore.collectionStub.add).toHaveBeenCalledWith(poll.testPoll);
    });
  });

  describe('getPoll', () => {
    it('Should call collection doc with pollId', () => {
      service.getPoll('someId');
      expect(poll.firestore.collectionStub.doc).toHaveBeenCalledWith('someId');
    });
  });

  describe('saveVote', () => {
    beforeEach(() => {
      spyOn(service, 'getPoll').and.returnValue(of(poll.testPoll));
    });

    it('Should call collection doc with pollId', () => {
      service.saveVote({
        pollId: 'someId',
        option: 'Chipotle'
      });
      expect(poll.firestore.collectionStub.doc).toHaveBeenCalledWith('someId');
    });

    it('Should call doc update with updated options', () => {
      service.saveVote({
        pollId: 'someId',
        option: 'Chipotle'
      });
      expect(poll.firestore.documentStub.update).toHaveBeenCalledWith({
        options: {
          ...poll.testPoll.options,
          'Chipotle': 1
        }
      });
    });

    it('Should call getPoll', () => {
      service.saveVote({
        pollId: 'someId',
        option: 'Chipotle'
      });
      expect(service.getPoll).toHaveBeenCalledWith('someId');
    });

    it('Should return null observable', () => {
      const result = service.saveVote({
        pollId: 'someId',
        option: 'Chipotle'
      });
      result.subscribe(res => {
        expect(res).toBeNull();
      });
    });
  });
});
