/**
 * In-memory data store for reviews.
 * No database is used — data resets on server restart.
 *
 * Review shape:
 * {
 *   id:         string   - unique identifier
 *   guestName:  string   - name of the guest
 *   hotel:      string   - hotel name
 *   rating:     number   - 1–5 integer
 *   review:     string   - review body text
 *   sentiment:  string   - 'positive' | 'neutral' | 'negative'
 *   date:       string   - ISO 8601 date string
 * }
 */

let reviews = [
  {
    id: '1',
    guestName: 'Sarah Mitchell',
    hotel: 'The Grand Harbor',
    rating: 5,
    review:
      'Absolutely stunning property. The staff went above and beyond to make our anniversary special. Will definitely return.',
    sentiment: 'positive',
    date: '2026-06-20T10:30:00.000Z',
  },
  {
    id: '2',
    guestName: 'James Chen',
    hotel: 'Skyline Boutique Hotel',
    rating: 4,
    review:
      'Great location and modern amenities. Room was clean and comfortable. Breakfast could have a wider selection.',
    sentiment: 'positive',
    date: '2026-06-18T14:15:00.000Z',
  },
  {
    id: '3',
    guestName: 'David Park',
    hotel: 'The Grand Harbor',
    rating: 3,
    review:
      'The room was decent but check-in took far too long. The concierge was helpful once we finally got assistance.',
    sentiment: 'neutral',
    date: '2026-06-15T09:00:00.000Z',
  },
  {
    id: '4',
    guestName: 'Priya Sharma',
    hotel: 'Oceanview Resort',
    rating: 5,
    review:
      'Perfect beach-side escape. The ocean view suite exceeded expectations. Spa service was phenomenal.',
    sentiment: 'positive',
    date: '2026-06-12T16:45:00.000Z',
  },
  {
    id: '5',
    guestName: 'Marcus Williams',
    hotel: 'Skyline Boutique Hotel',
    rating: 2,
    review:
      'Noisy room facing the street, AC unit was faulty. Housekeeping missed our room on day two. Disappointing stay.',
    sentiment: 'negative',
    date: '2026-06-10T11:20:00.000Z',
  },
  {
    id: '6',
    guestName: 'Elena Rodriguez',
    hotel: 'Oceanview Resort',
    rating: 4,
    review:
      'Lovely resort with beautiful grounds. The pool area is well maintained. Dinner at the restaurant was excellent.',
    sentiment: 'positive',
    date: '2026-06-08T19:00:00.000Z',
  },
  {
    id: '7',
    guestName: 'Tom Nguyen',
    hotel: 'The Grand Harbor',
    rating: 5,
    review:
      'Impeccable service from arrival to departure. The harbor view suite is worth every penny. A truly world-class hotel.',
    sentiment: 'positive',
    date: '2026-06-05T08:30:00.000Z',
  },
  {
    id: '8',
    guestName: 'Aisha Patel',
    hotel: 'City Center Inn',
    rating: 3,
    review:
      'Convenient location near the business district. Rooms are on the smaller side but tidy. Wi-Fi was unreliable.',
    sentiment: 'neutral',
    date: '2026-06-02T13:00:00.000Z',
  },
]

module.exports = reviews
