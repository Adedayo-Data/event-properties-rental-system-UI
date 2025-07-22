"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const mockVenue = {
  name: "The Grand Ballroom",
  location: "San Francisco, CA",
  image: "/images/Background.jpeg",
  price: 5000,
};

const months = [
  { name: "October 2024", days: 31, selected: [5, 30] },
  { name: "November 2024", days: 30, selected: [6, 7] },
];

export default function BookVenuePage() {
  const [guests, setGuests] = useState("");
  const [payment, setPayment] = useState("Card");

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-accent mb-6">
        Reserve your space
      </h1>
      {/* Venue Info */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="text-sm text-gray-500 mb-1">Selected venue</div>
          <div className="font-bold text-accent">{mockVenue.name}</div>
          <div className="text-xs text-gray-400">{mockVenue.location}</div>
        </div>
        <div className="w-40 h-24 rounded-xl overflow-hidden shadow-lg">
          <Image
            src={mockVenue.image}
            alt={mockVenue.name}
            width={160}
            height={96}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      {/* Calendar */}
      <div className="mb-8">
        <div className="font-semibold text-accent mb-2">Select date</div>
        <div className="flex gap-8">
          {months.map((month, idx) => (
            <div key={month.name} className="flex-1">
              <div className="text-sm font-semibold text-accent mb-2 flex items-center justify-between">
                {idx === 0 && <span>&lt;</span>}
                {month.name}
                {idx === months.length - 1 && <span>&gt;</span>}
              </div>
              <div className="grid grid-cols-7 gap-1 text-xs text-center">
                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                  <div key={i} className="font-bold text-gray-500">
                    {d}
                  </div>
                ))}
                {Array.from({ length: month.days }, (_, i) => i + 1).map(
                  (day) => (
                    <div
                      key={day}
                      className={`py-1 rounded-full ${
                        month.selected.includes(day)
                          ? "bg-primary text-white"
                          : "text-accent"
                      }`}
                    >
                      {day}
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Guests */}
      <div className="mb-8">
        <label className="block font-semibold text-accent mb-2">
          Number of guests
        </label>
        <input
          type="number"
          placeholder="Enter number of guests"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        />
      </div>
      {/* Total Price */}
      <div className="mb-8">
        <div className="font-semibold text-accent mb-1">Total price</div>
        <div className="text-lg font-bold text-primary">
          Total: ${mockVenue.price.toLocaleString()}
        </div>
      </div>
      {/* Payment Method */}
      <div className="mb-8">
        <div className="font-semibold text-accent mb-2">Payment method</div>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 border rounded-xl px-4 py-3 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="Card"
              checked={payment === "Card"}
              onChange={() => setPayment("Card")}
              className="accent-primary"
            />
            Card
          </label>
          <label className="flex items-center gap-2 border rounded-xl px-4 py-3 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="Bank"
              checked={payment === "Bank"}
              onChange={() => setPayment("Bank")}
              className="accent-primary"
            />
            Bank
          </label>
        </div>
      </div>
      {/* Confirm Button */}
      <Button className="w-full bg-primary text-white rounded-xl py-3 font-bold text-base hover:bg-accent hover:text-primary transition-colors">
        Confirm booking
      </Button>
    </div>
  );
}
