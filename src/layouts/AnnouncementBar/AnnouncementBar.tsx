import { IconButton } from '@/components/IconButton';
import { Typography } from '@/components/Typography';

export function AnnouncementBar() {
  return (
    <div className="bg-gray-100 border-b border-gray-200">
      <div className="max-w-[1530px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2">
          {/* Left side - Welcome message */}
          <Typography variant="bodySm" className="text-gray-700 font-medium">
            Welcome to worldwide Megamart!
          </Typography>

          {/* Right side - Action links */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Deliver to */}
            <a
              href="#"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              <IconButton
                icon="package"
                size="sm"
                variant="ghost"
                className="text-gray-500 hover:text-blue-600"
              />
              <span className="hidden sm:inline">
                Deliver to{' '}
                <span className="text-blue-600 font-medium">423651</span>
              </span>
            </a>

            {/* Track order */}
            <a
              href="#"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              <IconButton
                icon="package"
                size="sm"
                variant="ghost"
                className="text-gray-500 hover:text-blue-600"
              />
              <span className="hidden sm:inline">Track your order</span>
            </a>

            {/* All offers */}
            <a
              href="#"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              <IconButton
                icon="deals"
                size="sm"
                variant="ghost"
                className="text-gray-500 hover:text-blue-600"
              />
              <span className="hidden sm:inline">All Offers</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
