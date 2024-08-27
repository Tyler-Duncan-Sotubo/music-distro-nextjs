import FrequentlyAskedQuestions from "@/components/common/FrequentlyAskedQuestions";
import SubscriptionPlan from "@/components/common/SubscriptionPlan";
import { subscriptionPlanToChoose, pricingFAQ } from "@/data/data";
import { FaCircleCheck } from "react-icons/fa6";

const GetStartedButton = () => (
  <button className="mt-4 rounded-3xl border-2 px-2 py-2 text-xs capitalize text-black md:px-6 md:text-2xl">
    <p>Get Started</p>
  </button>
);

const page = async () => {
  return (
    <>
      <section>
        <div className="flex items-center justify-center">
          <h1 className="mb-10 mt-10 text-center text-7xl">Pricing</h1>
        </div>
        <section className="mx-auto w-[90%]">
          <SubscriptionPlan header="Choose the Right Plan for Your Music Distribution" />
        </section>

        {/* Frequently Asked Questions For Pricing */}
        <FrequentlyAskedQuestions
          faqs={pricingFAQ}
          header="Frequently Asked Questions"
        />

        {/* Subscription Plan To Choose */}
        <article className="min-h-screen py-16 text-black">
          <div className="mx-auto w-[95%]">
            <h1 className="mb-16 mt-4 text-center text-2xl md:text-5xl">
              Which Plan is Perfect for You?
            </h1>
            <div className="my-10 flex justify-between gap-2">
              <h3 className="w-[35%] text-2xl font-bold"></h3>
              <div className="flex flex-col items-center justify-center">
                <h3 className="text-sm font-bold md:text-2xl">Silver Plan</h3>
                <GetStartedButton />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h3 className="text-sm font-bold md:text-2xl">Gold Plan</h3>
                <GetStartedButton />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h3 className="text-sm font-bold md:text-2xl">Platinum Plan</h3>
                <GetStartedButton />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {subscriptionPlanToChoose.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between border-b border-b-zinc-900 py-3"
                >
                  <h3 className="w-[35%]">{item.feature}</h3>
                  {item.includes.map((include, index) => (
                    <div
                      key={index}
                      className={`flex w-[5%] items-center gap-2 ${
                        index === 2 ? "mr-12" : ""
                      }`}
                    >
                      <p>
                        {include === "yes" ? <FaCircleCheck size={30} /> : ""}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>
    </>
  );
};

export default page;
