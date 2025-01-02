import { Link } from "react-router-dom";
import FeatureCard from "../components/shared/FeatureCard";

export const Home = () => {
  return (
    <div
      className="md:h-[86.5vh] bg-cover bg-center md:p-0 p-11 "
      style={{
        backgroundImage: "url('/src/assets/hero-image.avif')",
        backgroundPosition: "center", // Can also use "top", "bottom", etc.
      }}
    >
      <div className="flex justify-center items-center md:h-full h-fit md:flex-row flex-col md:gap-11 gap-5">
        <Link to="/produk">
          <FeatureCard
            title="Manajemen Produk"
            listItems={[
              "Membuat Produk baru",
              "Menampilkan List Produk",
              "Merubah Detail Produk",
              "Menghapus Produk",
            ]}
            image="/src/assets/icon-product.svg"
          />
        </Link>

        <Link to="/customer">
          <FeatureCard
            title="Manajemen Customer"
            listItems={[
              "Membuat Pelanggan baru",
              "Menampilkan List Pelanggan",
              "Merubah detail Pelanggan",
              "Menghapus Pelanggan",
            ]}
            image="/src/assets/icon-customer.svg"
          />
        </Link>

        <Link to="/transaksi">
          <FeatureCard
            title="Manajemen Transaksi"
            listItems={[
              "Membuat Transaksi baru",
              "Menampilkan List Transaksi",
              "Menampilkan List Detail tiap Transaksi",
            ]}
            image="/src/assets/icon-transaction.svg"
          />
        </Link>

      </div>
    </div>
  );
};
