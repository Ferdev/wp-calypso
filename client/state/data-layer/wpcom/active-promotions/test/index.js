/** @format */
/**
 * Internal dependencies
 */
import { receiveActivePromotions, receiveError, requestActivePromotions } from '../';
import { http } from 'state/data-layer/wpcom-http/actions';
import {
	activePromotionsReceiveAction,
	activePromotionsRequestFailureAction,
	activePromotionsRequestSuccessAction,
} from 'state/active-promotions/actions';
import { WPCOM_RESPONSE } from 'state/plans/test/fixture';

describe( 'wpcom-api', () => {
	describe( 'active promotions request', () => {
		describe( '#requestActivePromotions', () => {
			test( 'should return HTTP request to active-promotions endpoint', () => {
				const action = { type: 'DUMMY' };

				expect( requestActivePromotions( action ) ).toEqual(
					http(
						{
							apiVersion: '1.1',
							method: 'GET',
							path: '/me/active-promotions',
						},
						action
					)
				);
			} );
		} );

		describe( '#receiveActivePromotions', () => {
			test( 'should return active promotions', () => {
				const activePromotions = WPCOM_RESPONSE;
				const action = activePromotionsReceiveAction( activePromotions );

				expect( receiveActivePromotions( action, activePromotions ) ).toEqual( [
					activePromotionsRequestSuccessAction(),
					activePromotionsReceiveAction( activePromotions ),
				] );
			} );
		} );

		describe( '#receiveError', () => {
			test( 'should return error', () => {
				const error = 'could not find active promotions';
				const action = activePromotionsRequestFailureAction( error );

				expect( receiveError( action, error ) ).toEqual(
					activePromotionsRequestFailureAction( error )
				);
			} );
		} );
	} );
} );
