import { TestBed } from '@angular/core/testing';

import { AngularFirestore } from 'angularfire2/firestore';

import { VoteService } from './vote.service';

import { vote } from '../../../test-helpers';

describe('VoteService', () => {
  let service: VoteService;
  let afs: AngularFirestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        VoteService,
        { provide: AngularFirestore, useValue: vote.firestore.angularFirestoreStub }]
    });

    service = TestBed.get(VoteService);
    afs = TestBed.get(AngularFirestore);
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should call AngularFirestore collection with "vote"', () => {
    expect(afs.collection).toHaveBeenCalledWith('vote');
  });

  describe('trackVote', () => {
    afterEach(() => {
      while (vote.firestore.testVoteItems.length > 0) {
        vote.firestore.testVoteItems.pop();
      }
    });

    it('Should call vote collection doc with user id', () => {
      service.trackVote(vote.testPayload);
      expect(vote.firestore.collectionStub.doc).toHaveBeenCalledWith(vote.testPayload.userId);
    });

    it('Should call document collection with "votes"', () => {
      service.trackVote(vote.testPayload);
      expect(vote.firestore.documentStub.collection).toHaveBeenCalledWith('votes');
    });

    it('Should return correct data', () => {
      const result = service.trackVote(vote.testPayload, 10000);
      result.subscribe(res => {
        expect(res).toEqual({
          pollId: vote.testPayload.pollId,
          options: vote.testPayload.options,
          votedOn: 10000
        });
      });
    });
  });

  describe('getVotesForUser', () => {
    it('Should call vote collection doc with user id', () => {
      service.getVotesForUser('user id');
      expect(vote.firestore.collectionStub.doc).toHaveBeenCalledWith('user id');
    });

    it('Should return empty list when there is no data', () => {
      const result = service.getVotesForUser('user id');
      result.subscribe(res => {
        expect(res.length).toBe(0);
      });
    });

    it('Should return correct data', () => {
      vote.firestore.testVoteItems.push({
        pollId: 'some id',
        options: ['some option'],
        votedOn: 10000
      });
      const result = service.getVotesForUser('user id');
      result.subscribe(res => {
        expect(res).toEqual([{
          pollId: 'some id',
          options: ['some option'],
          votedOn: 10000
        }]);
      });
    });
  });
});
