# mock_hostaway.py
from fastapi import FastAPI
from fastapi.responses import JSONResponse

hostaway = FastAPI()

MOCK_REVIEWS = {
  "status": "success",
  "result": [
    {
      "id": 1001,
      "type": "guest-to-host",
      "status": "published",
      "rating": 5,
      "publicReview": "Amazing place, spotless and cozy!",
      "reviewCategory": [],
      "departureDate": "2024-09-20 10:00:00",
      "guestName": "Sarah M.",
      "listingName": "Ocean View Villa",
      "listingMapId": 1,
      "channelId": 2018
    },
    {
      "id": 1002,
      "type": "guest-to-host",
      "status": "published",
      "rating": 3,
      "publicReview": "Great location but wifi was unreliable.",
      "reviewCategory": [],
      "departureDate": "2024-09-18 09:00:00",
      "guestName": "Mike R.",
      "listingName": "Downtown Loft",
      "listingMapId": 2,
      "channelId": 2002
    },
    {
      "id": 1003,
      "type": "guest-to-host",
      "status": "published",
      "rating": None,
      "publicReview": "Lovely cabin, peaceful area.",
      "reviewCategory": [
        {"category": "cleanliness", "rating": 8},
        {"category": "communication", "rating": 9},
        {"category": "respect_house_rules", "rating": 7}
      ],
      "departureDate": "2024-09-15 14:00:00",
      "guestName": "Lisa K.",
      "listingName": "Mountain Cabin",
      "listingMapId": 3,
      "channelId": 2005
    },
    {
      "id": 1004,
      "type": "guest-to-host",
      "status": "published",
      "rating": 2,
      "publicReview": "Apartment was not clean and quite noisy.",
      "reviewCategory": [],
      "departureDate": "2024-09-12 11:00:00",
      "guestName": "David L.",
      "listingName": "City Center Apartment",
      "listingMapId": 4,
      "channelId": 2000
    },
    {
      "id": 1005,
      "type": "guest-to-host",
      "status": "published",
      "rating": 5,
      "publicReview": "Perfect beach holiday — highly recommended!",
      "reviewCategory": [],
      "departureDate": "2024-09-10 16:00:00",
      "guestName": "Emma T.",
      "listingName": "Beach House",
      "listingMapId": 5,
      "channelId": 2018
    },
    {
      "id": 1006,
      "type": "guest-to-host",
      "status": "published",
      "rating": None,
      "publicReview": "Very comfortable stay, hosts were welcoming.",
      "reviewCategory": [
        {"category": "cleanliness", "rating": 9},
        {"category": "communication", "rating": 10},
        {"category": "respect_house_rules", "rating": 9}
      ],
      "departureDate": "2024-09-08 09:30:00",
      "guestName": "Carlos P.",
      "listingName": "Country Cottage",
      "listingMapId": 6,
      "channelId": 2007
    },
    {
      "id": 1007,
      "type": "guest-to-host",
      "status": "published",
      "rating": 4,
      "publicReview": "Great experience overall, minor issues with check-in.",
      "reviewCategory": [],
      "departureDate": "2024-09-05 12:00:00",
      "guestName": "Sophia W.",
      "listingName": "Lakefront Retreat",
      "listingMapId": 7,
      "channelId": 2013
    },
    {
      "id": 1008,
      "type": "guest-to-host",
      "status": "published",
      "rating": None,
      "publicReview": "Beautiful house, but could improve cleanliness.",
      "reviewCategory": [
        {"category": "cleanliness", "rating": 6},
        {"category": "communication", "rating": 9},
        {"category": "respect_house_rules", "rating": 8}
      ],
      "departureDate": "2024-09-03 18:00:00",
      "guestName": "John D.",
      "listingName": "Hillside Villa",
      "listingMapId": 8,
      "channelId": 2020
    },
    {
      "id": 1009,
      "type": "guest-to-host",
      "status": "published",
      "rating": 1,
      "publicReview": "Terrible stay — very disappointing.",
      "reviewCategory": [],
      "departureDate": "2024-08-30 20:00:00",
      "guestName": "Anna G.",
      "listingName": "Budget Studio",
      "listingMapId": 9,
      "channelId": 2016
    },
    {
      "id": 1010,
      "type": "guest-to-host",
      "status": "published",
      "rating": None,
      "publicReview": "Fantastic hospitality, would book again!",
      "reviewCategory": [
        {"category": "cleanliness", "rating": 10},
        {"category": "communication", "rating": 10},
        {"category": "respect_house_rules", "rating": 10}
      ],
      "departureDate": "2024-08-28 15:00:00",
      "guestName": "Nina S.",
      "listingName": "Luxury Penthouse",
      "listingMapId": 10,
      "channelId": 2022
    }
  ],
  "count": 10,
  "offset": None
}

@hostaway.get("/hostaway/reviews")
async def get_reviews():
    return JSONResponse(content=MOCK_REVIEWS)