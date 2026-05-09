import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "CitySignal — Citizen Issue Reporting for Armenia",
  description: "Report urban problems like potholes, broken streetlights, water issues, and more. Track your report in real time. Make Armenian cities better.",
  keywords: ["Armenia", "Yerevan", "citizen reporting", "311", "urban issues", "city problems"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
