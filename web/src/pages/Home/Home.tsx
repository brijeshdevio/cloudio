import { Footer, Navbar } from "@/components";
import { features } from "@/data";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="w-full min-h-[400px] h-[70vh] flex items-center justify-center">
      <div className="flex flex-col gap-5 text-center">
        <h1 className="text-4xl font-semibold">
          Securely store, share, <br /> and collaborate on all your files
        </h1>
        <p className="text-foreground/80">
          Access your files from anywhere, on any device, and work together{" "}
          <br /> in real-time with Google's powerful suite of apps.
        </p>
        <div className="flex items-center justify-center gap-6">
          <Link to={"/my-drive"}>
            <button className="btn btn-primary">Get Started</button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <main className="w-full sm:w-[95%] mx-auto py-5 px-3 sm:px-5">
        {/* Why SnippetX Section */}
        <section className="w-full py-20">
          <div className="text-center">
            <h2 className="text-2xl font-semibold">
              Everything you need, all in one place
            </h2>
            <p className="text-foreground/80">
              Discover how Google Drive simplifies your digital life by keeping
              your files secure, organized, and accessible.
            </p>
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            {features?.map((feature, index: number) => (
              <div key={index} className="card bg-base-100">
                <div className="card-body">
                  <div className="bg-base-300 w-fit h-fit p-2 rounded-full ">
                    <feature.Icon size={25} className="text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold">{feature.title}</h2>
                  <p className="text-foreground/80">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
