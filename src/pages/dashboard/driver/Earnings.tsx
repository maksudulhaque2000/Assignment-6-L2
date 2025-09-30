
import { useGetDriverEarningsQuery, useGetEarningsAnalyticsQuery } from "../../../redux/features/driver/driverApi";
import AnalyticsChart from "../AnalyticsChart";
import StatCard from "../StatCard";

const Earnings = () => {
    const { data: earningsData, isLoading: isLoadingEarnings } = useGetDriverEarningsQuery(undefined);
    const { data: analyticsData, isLoading: isLoadingAnalytics } = useGetEarningsAnalyticsQuery(undefined);

    if (isLoadingEarnings || isLoadingAnalytics) {
        return <div>Loading earnings data...</div>
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 dark:text-white">My Earnings</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard title="Total Earnings" value={`$${earningsData?.data?.totalEarnings?.toFixed(2) || 0}`} />
                <StatCard title="Rides Completed" value={earningsData?.data?.completedRides || 0} />
            </div>
            <div>
                <h2 className="text-2xl font-semibold mb-4 dark:text-white">Monthly Earnings</h2>
                <AnalyticsChart 
                    data={analyticsData?.data || []}
                    dataKey="totalEarnings"
                />
            </div>
        </div>
    );
};

export default Earnings;