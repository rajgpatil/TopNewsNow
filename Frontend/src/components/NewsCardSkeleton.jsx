import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";

const NewsCardSkeleton = () => {
    return (
        <Box>
            <Card elevation={0} sx={{ maxWidth: 345, margin: '2rem', width: 300, border: 'none' }}>
                {/* Skeleton for Image */}
                <Skeleton variant="rectangular" sx={{ height: 300, borderRadius: 5 }} />

                <CardContent>
                    {/* Skeleton for Title */}
                    <Skeleton variant="text" height={40} width="80%" />

                    {/* Skeleton for Description */}
                    <Skeleton variant="text" width="100%" />
                    <Skeleton variant="text" width="90%" />

                    {/* Skeleton for Button */}
                    <Skeleton variant="rounded" width={100} height={36} sx={{ mt: 2, borderRadius: 2 }} />
                </CardContent>
            </Card>
        </Box>
    );
};

export default NewsCardSkeleton;
