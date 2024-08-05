import { DesktopNavigation } from "./DesktopNavigation";
import { MobileNavigation } from "./MobileNavigation";

export default async function Navigation() {
  return (
    <>
      {/* Desktop Navigation */}
      <DesktopNavigation />

      {/* Mobile Navigation */}
      <MobileNavigation />
    </>
  );
}
