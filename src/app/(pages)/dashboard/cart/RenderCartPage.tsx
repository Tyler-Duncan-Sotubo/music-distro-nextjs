"use client";

import Link from "next/link";
import { MdCancel } from "react-icons/md";
import PayStack from "@/features/paystack/PayStack";
import { Button } from "@/components/ui/Button";
import { type User } from "next-auth";

const CartPage = ({ user }: { user: User | undefined }) => {
  const cartItem = [
    {
      product: "Music",
      description: "Music Subscription",
      price: 10,
      price_in_naira: 5000,
      cartQuantity: 1,
    },
  ];
  const getPrice = () => {
    return currency === "NGN"
      ? `₦ ${cartItem[0]?.price_in_naira}`
      : `$${cartItem[0]?.price}`;
  };

  const currency = "NGN";

  return (
    <>
      {cartItem.length > 0 ? (
        <section className="md:my-16">
          <h1 className="mb-4 mt-16 md:mt-32">Your Cart</h1>
          <h3>Review your order & subscription details</h3>
          <div>
            <div className="w-full">
              <div className="hidden md:block">
                <table className="divide-gray-200 my-12 min-w-full divide-y text-[14px] uppercase">
                  <thead className="font-regular text-purple bg-white uppercase">
                    <tr>
                      <th className="p-4 text-left">Product</th>
                      <th className="p-4 text-left">Description</th>
                      <th className="p-4 text-left">Actions</th>
                      <th className="p-4 text-left">Price</th>
                      <th className="p-4 text-left">Quantity</th>
                      <th className="p-4 text-right">Item Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-gray-200 divide-y bg-white capitalize">
                    <tr className="text-xl">
                      <td className="whitespace-nowrap px-4 py-6 font-bold">
                        <p>{cartItem[0]?.product}</p>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 font-bold">
                        <p>{cartItem[0]?.description}</p>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 font-bold">
                        <button
                          className="flex items-center gap-2 rounded-xl bg-error p-2 text-sm text-white"
                          onClick={() => console.log("Hello")}
                        >
                          <MdCancel size={25} />
                          <p>Remove Item</p>
                        </button>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 font-bold">
                        <p>{getPrice()}</p>
                      </td>
                      <td className="whitespace-nowrap px-8 py-4 font-bold">
                        <p>{cartItem[0]?.cartQuantity}</p>
                      </td>
                      <td className="whitespace-nowrap py-4 text-right font-bold">
                        <p>{getPrice()}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="my-10 text-sm capitalize md:hidden">
                {mobileView.map((item, index) => (
                  <div key={index} className="my-6 flex justify-between">
                    <div className="font-bold">{item.name}</div>
                    <div className="font-bold">
                      {item.name === "product" && cartItem[0]?.product}
                      {item.name === "actions" && (
                        <button
                          className="flex items-center gap-2 rounded-xl bg-error p-2 text-sm text-white"
                          onClick={() => console.log("Hello")}
                        >
                          <MdCancel size={25} />
                          <p>Remove Item</p>
                        </button>
                      )}
                      {item.name === "price" && <p>{getPrice()}</p>}
                      {item.name === "quantity" && cartItem[0]?.cartQuantity}
                      {item.name === "item total" && <p>{getPrice()}</p>}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-xl">
                <div className="my-4 flex justify-end gap-20 font-bold">
                  <p>Subtotal</p>
                  <p>{getPrice()}</p>
                </div>
                <div className="my-4 flex justify-end gap-20 font-bold">
                  <p>Total</p>
                  <p>{getPrice()}</p>
                </div>
              </div>

              {/* Payment Buttons */}

              <div className="mt-24 justify-end gap-10 md:flex">
                {/* PayStack */}
                <div className="my-10 w-full md:my-0 md:w-1/4">
                  <PayStack cartItem={cartItem[0]} user={user} />
                </div>

                {/* Paypal */}
                {/* <div className="w-full md:w-1/4">
                  <PaypalPayment cartItem={cartItem[0]} user={user} />
                </div> */}
              </div>
              <h5 className="my-6 text-center md:text-right">
                By making a payment you are agreeing to our
                <Link href="/terms">
                  <span className="mx-1 font-bold text-primary">
                    terms and conditions.
                  </span>
                </Link>
              </h5>
            </div>
          </div>
        </section>
      ) : (
        <section className="my-44 flex flex-col items-center justify-center capitalize">
          <h1>You have nothing in your cart</h1>
          <h3 className="my-8 font-medium">
            checkout some of our other great services
          </h3>
          <div className="flex flex-wrap justify-center gap-10 md:flex-row">
            <Link href="/dashboard/music">
              <Button
                className="border-2 border-primary bg-white hover:text-white"
                color="text-black"
              >
                New Music Release
              </Button>
            </Link>
            <Link href="/dashboard/subscription">
              <Button
                className="border-2 border-primary bg-white hover:text-white"
                color="text-black"
              >
                Subscriptions
              </Button>
            </Link>
            <Link href="/dashboard/videos">
              <Button
                className="border-2 border-primary bg-white hover:text-white"
                color="text-black"
              >
                New Video Release
              </Button>
            </Link>
          </div>
        </section>
      )}
    </>
  );
};

export default CartPage;

const mobileView = [
  { name: "product" },
  { name: "actions" },
  { name: "price" },
  { name: "quantity" },
  { name: "item total" },
];
